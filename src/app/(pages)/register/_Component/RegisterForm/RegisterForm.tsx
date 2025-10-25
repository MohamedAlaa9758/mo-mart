"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { signIn } from 'next-auth/react'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import { useSearchParams } from "next/navigation"
const formSchema = z.object({
    name: z.string().nonempty('Name is Required').min(3, "Name is at least 3 carcter")
        .max(20, "Name is at most 20 carcter"),
    email: z.string().email('Invalid email').nonempty('Email is Required'),
    password: z.string().nonempty('Password is Required')
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'invalid password'),
    rePassword: z.string().nonempty("Repassword is Required "),

    phone: z.string().nonempty('Phone is Required').regex(/^(010|011|012|015)\d{8}$/
        , 'inValid Phone')
}).refine((data) => data.password === data.rePassword, {
    path: ["rePassword"],
    message: "Password and rePassword ont match",
});
type FormField = z.infer<typeof formSchema>
export default function RegisterForm() {
    const [isloading, setIsloading] = useState(false)
    const searchParams = useSearchParams()

    const form = useForm<FormField>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: "",
            password: "",
            rePassword: '',
            phone: ''
        },
    })

    async function onSubmit(values: FormField) {
        try {
            setIsloading(true);
            const registerResponse = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });

            const registerData = await registerResponse.json();

            if (!registerResponse.ok) {
                console.error("Signup failed:", registerData);
                alert(registerData.message || "Registration failed");
                setIsloading(false);
                return;
            }


            const loginResponse = await signIn("credentials", {
                redirect: true,
                callbackUrl: "/login",
                email: values.email,
                password: values.password,
            });

        } catch (error) {
            console.error("Error during signup:", error);
            alert("Something went wrong!");
        } finally {
            setIsloading(false);
        }
    }

    return (<>

        <Card className="w-sm p-5">
            {searchParams.get('error') ?
                <h2 className="text-red-500 text-center">{searchParams.get('error')}</h2>
                : ''
            }
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Your Name" type="name"{...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Ali@example.com" type="email"{...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="Ahmed@1234" type="password"{...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="rePassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>RePassword</FormLabel>
                                <FormControl>
                                    <Input placeholder="Ahmed@1234" type="password"{...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone</FormLabel>
                                <FormControl>
                                    <Input placeholder="01012345678" type="phone"{...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit"
                        disabled={isloading}
                        className="bg-black text-white cursor-pointer w-full">
                        {isloading && <Loader2 className="animate-spin" />}Submit
                    </Button>
                </form>
            </Form>
        </Card>
    </>
    )
}
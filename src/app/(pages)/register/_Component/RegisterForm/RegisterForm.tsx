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
import { Loader2, Eye, EyeOff } from "lucide-react" // تم إضافة Eye و EyeOff هنا
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
    message: "Password and rePassword don't match",
});

// تغيير الاسم هنا لمنع التعارض مع مكون FormField
type RegisterFormValues = z.infer<typeof formSchema>

export default function RegisterForm() {
    const [isloading, setIsloading] = useState(false)

    // حالات التحكم في إظهار وإخفاء الباسورد
    const [showPassword, setShowPassword] = useState(false)
    const [showRePassword, setShowRePassword] = useState(false)

    const searchParams = useSearchParams()

    const form = useForm<RegisterFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: "",
            password: "",
            rePassword: '',
            phone: ''
        },
    })

    async function onSubmit(values: RegisterFormValues) {
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

            await signIn("credentials", {
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

    return (
        <Card className="w-sm p-5">
            {searchParams.get('error') && (
                <h2 className="text-red-500 text-center mb-4">{searchParams.get('error')}</h2>
            )}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Your Name" type="text" {...field} />
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
                                    <Input placeholder="Ali@example.com" type="email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* حقل كلمة المرور الأساسي */}
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            placeholder="Ahmed@1234"
                                            type={showPassword ? "text" : "password"}
                                            className="pr-10" // مساحة إضافية لزر العين
                                            {...field}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                                        >
                                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* حقل تأكيد كلمة المرور */}
                    <FormField
                        control={form.control}
                        name="rePassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            placeholder="Ahmed@1234"
                                            type={showRePassword ? "text" : "password"}
                                            className="pr-10"
                                            {...field}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowRePassword(!showRePassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                                        >
                                            {showRePassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
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
                                    <Input placeholder="01012345678" type="tel" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit"
                        disabled={isloading}
                        className="bg-black text-white cursor-pointer w-full">
                        {isloading && <Loader2 className="animate-spin mr-2" />}Submit
                    </Button>
                </form>
            </Form>
        </Card>
    )
}
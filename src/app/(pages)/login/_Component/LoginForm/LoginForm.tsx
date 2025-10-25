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
    email: z.email('invalid email').nonempty('Email is Required'),
    password: z.string().nonempty('Password is Required')
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'invalid password'),
})
type FormField = z.infer<typeof formSchema>
export default function LoginForm() {
    const [isloading, setIsloading] = useState(false)
    const searchParams = useSearchParams()
    const callbackURL = searchParams.get('callback-url')
    const form = useForm<FormField>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })

    async function onSubmit(values: FormField) {
        setIsloading(true)
        const response = await signIn('credentials', {
            callbackUrl: callbackURL ?? '/',
            redirect: true,
            email: values.email,
            password: values.password,
        });
        setIsloading(false)
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
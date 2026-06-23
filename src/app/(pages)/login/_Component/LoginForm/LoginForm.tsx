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
import { Loader2, Eye, EyeOff } from "lucide-react" // تم إضافة أيقونات العين هنا
import { useSearchParams } from "next/navigation"

const formSchema = z.object({
    // تعديل z.email() إلى z.string().email() لأن الأول غير موجود في zod
    email: z.string().email('Invalid email').nonempty('Email is Required'),
    password: z.string().nonempty('Password is Required')
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'invalid password'),
})

// تغيير الاسم لمنع التعارض مع المكون المسمى FormField
type LoginFormValues = z.infer<typeof formSchema>

export default function LoginForm() {
    const [isloading, setIsloading] = useState(false)
    const [showPassword, setShowPassword] = useState(false) // حالة التحكم في إظهار الباسورد

    const searchParams = useSearchParams()
    const callbackURL = searchParams.get('callback-url')

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })

    async function onSubmit(values: LoginFormValues) {
        setIsloading(true)
        await signIn('credentials', {
            callbackUrl: callbackURL ?? '/',
            redirect: true,
            email: values.email,
            password: values.password,
        });
        setIsloading(false)
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

                    {/* حقل الباسورد مع زر العين */}
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
                                            type={showPassword ? "text" : "password"} // تغيير الـ type بناءً على الحالة
                                            className="pr-10" // إضافة padding يمين عشان النص ميتداخلش مع العين
                                            {...field}
                                        />
                                        <button
                                            type="button" // مهم جداً عشان المتصفح ميعتبرش الضغطة "Submit" للفورم
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
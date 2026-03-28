import React, { useRef, useState } from 'react'
import { Button } from '../ui/button'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CartResponse } from '@/interfaces'
import { Loader2 } from 'lucide-react'
export default function Checkout({ cartId }: { cartId: string }) {
    const cityInput = useRef<HTMLInputElement | null>(null)
    const detailsInput = useRef<HTMLInputElement | null>(null)
    const phoneInput = useRef<HTMLInputElement | null>(null)
    const [isloadingSession, setIsloadingSession] = useState(false)
    const [isloadingCash, setIsloadingCash] = useState(false)

    async function CheckoutSession(CartId: string) {

        const shippingAddress = {
            details: detailsInput.current?.value,
            phone: phoneInput.current?.value,
            city: cityInput.current?.value
        }
        setIsloadingSession(true)
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${CartId}?url=http://localhost:3000`,
            {
                method: 'POST',
                body: JSON.stringify({ shippingAddress }),
                headers: {
                    token:
                        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZDkzODY0NTNjMmZkMjM4YTY2OWU5YSIsIm5hbWUiOiJtb2hhbWVkIGFsYWEiLCJyb2xlIjoidXNlciIsImlhdCI6MTc1OTA2NjIzMiwiZXhwIjoxNzY2ODQyMjMyfQ.3v2qo6kZHF5_pakDZLeT8rIuUo9kn6pIUy0PYbA01yM",
                    "Content-Type": "application/json"

                },
            }
        )
        const data: CartResponse = await response.json();
        if (data.status == "success") {
            location.href = data?.session!.url

        }
        setIsloadingSession(false)
    }
    async function CheckoutCash(CartId: string) {

        const shippingAddress = {
            details: detailsInput.current?.value,
            phone: phoneInput.current?.value,
            city: cityInput.current?.value
        }
        setIsloadingCash(true)
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/${CartId}`,
            {
                method: 'POST',
                body: JSON.stringify({ shippingAddress }),
                headers: {
                    token:
                        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZDkzODY0NTNjMmZkMjM4YTY2OWU5YSIsIm5hbWUiOiJtb2hhbWVkIGFsYWEiLCJyb2xlIjoidXNlciIsImlhdCI6MTc1OTA2NjIzMiwiZXhwIjoxNzY2ODQyMjMyfQ.3v2qo6kZHF5_pakDZLeT8rIuUo9kn6pIUy0PYbA01yM",
                    "Content-Type": "application/json"

                },
            }
        )
        const data: CartResponse = await response.json();
        if (data.status === "success") {
            window.location.href = "/allorders";
        }
        setIsloadingCash(false)
    }
    return <>
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button size='lg' className="w-full cursor-pointer my-4 bg-black text-white">Proceed To Checkout</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] bg-white">
                    <DialogHeader>
                        <DialogTitle>Add Shopping Address</DialogTitle>
                        <DialogDescription>
                            Please Add Shopping Address
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="city">City</Label>
                            <Input id="city" ref={cityInput} />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="details">Details</Label>
                            <Input id="details" ref={detailsInput} />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="phone">Phone</Label>
                            <Input id="phone" ref={phoneInput} />
                        </div>

                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button onClick={() => CheckoutCash(cartId)} >{isloadingCash && <Loader2 className='animate-spin' />}Cash</Button>
                        <Button onClick={() => CheckoutSession(cartId)} >{isloadingSession && <Loader2 className='animate-spin' />} Visa</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    </>
}

import { Card, CardContent } from "@/components/ui/card";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FaGoogle, FaGithub } from "react-icons/fa";


import { useForm } from "react-hook-form";
import Link from "next/link";
import { OctagonAlertIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, { message: "Password is required" }),
});

export default function SignInView() {

    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [pending, setPending] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        setError(null);
        setPending(true);
        authClient.signIn.email({
            email: data.email,
            password: data.password,
        }, {
            onSuccess: () => {
                router.push("/");
            },
            onError: ({ error }) => {
                setPending(false);
                setError(error.message);
            },
        });
    }

    return (
        <div className="flex flex-col gap-6">
            <Card className="overflow-hidden p-0">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <Form {...form} >
                        <form className="p-6 md:p-8" onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col items-center text-center">
                                    <h1 className="text-2xl font-bold">
                                        Welcome Back to Meet.Ai
                                    </h1>
                                    <p className="text-muted-foreground text-balance">
                                        Login to your account
                                    </p>
                                </div>
                                <div className="grid gap-3">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="email"
                                                        placeholder="M@example.com"
                                                        {...field}
                                                    />
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
                                                    <Input
                                                        type="password"
                                                        placeholder="********"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                {!!error && (
                                    <Alert variant="destructive" className="bg-destructive/10 border-none">
                                        <OctagonAlertIcon className="h-4 w-4 !text-destructive" />
                                        <AlertTitle>{error}</AlertTitle>
                                    </Alert>
                                )}
                                <Button
                                    type="submit"
                                    disabled={pending}
                                    className="w-full cursor-pointer"
                                >
                                    Sign in
                                </Button>
                                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                                    <span className="bg-card text-muted-foreground relative z-10 px-2">
                                        Or continue with
                                    </span>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <Button
                                        variant="outline"
                                        className="w-full cursor-pointer"
                                        type="button"
                                        disabled={pending}
                                    >
                                        <FaGoogle />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="w-full cursor-pointer"
                                        type="button"
                                        disabled={pending}
                                    >
                                        <FaGithub />
                                    </Button>
                                </div>

                                <div className="text-center text-sm">
                                    Dont&apos;t have an account?{" "}
                                    <Link
                                        href={"/sign-up"}
                                        className="underline underline-offset-4"
                                    >
                                        Sign up
                                    </Link>
                                </div>
                            </div>

                        </form>
                    </Form>
                    <div className="bg-radial from-green-700 to-green-900 relative hidden md:flex flex-col gap-y-4 items-center justify-center">
                        <img src="/logo.svg" alt="logo" className="w-[92px] h-[92px]" />
                        <p className="text-white text-2xl font-semibold">
                            Meet.the.AI
                        </p>

                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
"use client";

import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";


import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Button } from "@/components/ui/button";
import { LoadingSwap } from "@/components/ui/loading-swap";
import { useRouter } from "next/navigation";

const signInSchema = z.object({
  email: z.email().min(1, "Email can't be empty."),
  password: z.string().min(6, "Password is too short."),
});

type SignInForm = z.infer<typeof signInSchema>;

export function SignInTab() {
  const form = useForm<SignInForm>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  async function handleSignIn(data: SignInForm) {
    toast.info("Signing in...", {
      style: {
        "--border-radius": "calc(var(--radius)  + 8px)",
      } as React.CSSProperties,
      duration: 2000,
    });

    await authClient.signIn.email(
      {
        ...data,
        callbackURL: "/dashboard",
      },
      {
        onError: (error) => {
          toast.error(error.error.message || "Failed to sign in", {
            style: {
              "--border-radius": "calc(var(--radius)  + 8px)",
            } as React.CSSProperties,
            duration: 4000,
          });
        },
        onSuccess: () => {
          toast.success("Succesfully signed in...", {
            style: {
              "--border-radius": "calc(var(--radius)  + 8px)",
            } as React.CSSProperties,
            duration: 6000,
          });
          router.push("/dashboard");
        },
      },
    );
  }

  const { isSubmitting } = form.formState;

  return (
    <form id="signup-form" onSubmit={form.handleSubmit(handleSignIn)}>
      <FieldGroup>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="signup-form-email">Email</FieldLabel>
              <Input
                {...field}
                id="signup-form-email"
                aria-invalid={fieldState.invalid}
                placeholder="shuklajohn23@vemail.com"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="signup-form-password">
                Password
                <span className="text-xs text-muted-foreground">
                  (must be atleast 6 characters)
                </span>
              </FieldLabel>
              <PasswordInput
                {...field}
                id="signup-form-password"
                aria-invalid={fieldState.invalid}
                placeholder="password"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting}
        className="w-full mt-8"
      >
        <LoadingSwap isLoading={isSubmitting}>Sign In</LoadingSwap>
      </Button>
    </form>
  );
}

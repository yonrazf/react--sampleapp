import { getToken } from "@/utils/getToken";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import toast from "react-hot-toast";
import { useAuthActions, useLoginActions } from "@frontegg/react";
import { useNavigate } from "react-router";

const signUpSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().min(2, "Name must be at least 2 characters long"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/\d/, "Password must contain at least one number")
    .regex(/[@$!%*?&]/, "Password must contain at least one special character"),
});

type SignUpFormData = z.infer<typeof signUpSchema>;

const CustomSignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });
  const navigate = useNavigate();

  const { __requestHostedLoginSilentAuthorize } = useAuthActions();
  const { requestAuthorize } = useLoginActions();

  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data: SignUpFormData) => {
    setErrorMessage(""); // Reset errors

    try {
      const token = await getToken();
      const response = await fetch(
        "https://api.frontegg.com/identity/resources/users/v1/signUp",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "frontegg-application-id": "your-application-id",
            "frontegg-vendor-host": "your-vendor-host",
          },
          body: JSON.stringify({
            provider: "local",
            email: data.email,
            name: data.name,
            password: data.password,
            skipInviteEmail: true,
            roleIds: ["128de067-f955-40f0-ad6f-e9cf69871e6f"],
            companyName: "mycompany",
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to sign up");
      }

      toast.success("Signup successful!");

      // afterSignup
      __requestHostedLoginSilentAuthorize()
        .catch((err) => {
          console.error(err);
        })
        .then(() => {
          // redirect to app
          navigate("/");
        });
    } catch (error: any) {
      setErrorMessage(error.message);
      toast.error(error.message);
    }
  };

  return (
    <Card className="max-w-md mx-auto mt-10 p-4">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Input */}
          <div>
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" {...register("email")} />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Name Input */}
          <div>
            <Label htmlFor="name">Name</Label>
            <Input type="text" id="name" {...register("name")} />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Password Input */}
          <div>
            <Label htmlFor="password">Password</Label>
            <Input type="password" id="password" {...register("password")} />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Signing up..." : "Sign Up"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CustomSignUpForm;

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SignInTab } from "./_components/sign-in-tab";
import { SignUpTab } from "./_components/sign-up-tab";
import { Separator } from "@/components/ui/separator";

export default function SigninPage() {
  return (
    <Tabs
      defaultValue="signin"
      className="mx-auto min-w-3xs w-2/3 md:w-lg my-16"
    >
      <TabsList>
        <TabsTrigger value="signin">Sign In</TabsTrigger>
        <TabsTrigger value="signup">Sign Up</TabsTrigger>
      </TabsList>
      <TabsContent value="signin">
        <Card>
          <CardHeader className="mb-2">
            <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Sign In form */}
            <SignInTab />
          </CardContent>

          <Separator />
          
        </Card>
      </TabsContent>
      <TabsContent value="signup">
        <Card>
          <CardHeader className="mb-2">
            <CardTitle className="text-2xl font-bold">Sign Up</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Sign Up form */}
            <SignUpTab />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

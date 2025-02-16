import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { signInWithGithub } from "./actions";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>Login with your GitHub account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="flex flex-col gap-4">
              <form action={signInWithGithub}>
                <Button variant="outline" type="submit" className="w-full">
                  <GitHubLogoIcon className="mr-2 size-4" />
                  Sign in with GitHub
                </Button>
              </form>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Why Oauth?</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible>
            <AccordionItem value="why-oauth">
              <AccordionTrigger>Signing in with Oauth</AccordionTrigger>
              <AccordionContent>
                <p>
                  By signing in with one of the options above, I don't have to
                  store your sensitive data! All I want is an ID so that I can
                  identify you and keep track of your preferences and bookmarks.
                </p>
                <p className="mt-4">
                  If these providers don't work for you, or you would like me to
                  add one, please email brook@banner.black.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}

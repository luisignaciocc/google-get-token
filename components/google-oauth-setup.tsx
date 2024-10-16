"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function GoogleOauthSetup() {
  const [clientId, setClientId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [scopes, setScopes] = useState("");
  const [callbackUrl, setCallbackUrl] = useState("");

  useEffect(() => {
    setCallbackUrl(window.location.origin + "/callback");
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const scopeList = scopes
      .split(",")
      .map((scope) => scope.trim())
      .filter(Boolean);

    localStorage.setItem("client_id", clientId);
    localStorage.setItem("client_secret", clientSecret);

    const queryParams = new URLSearchParams({
      client_id: clientId,
      redirect_uri: callbackUrl,
      response_type: "code",
      scope: scopeList.join(" "),
      access_type: "offline",
      prompt: "consent",
    });

    window.location.href = `https://accounts.google.com/o/oauth2/auth?${queryParams.toString()}`;
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Enter your Google OAuth credentials</CardTitle>
          <CardDescription>
            You should configure {callbackUrl} in the redirect URI of your
            Google Cloud Console project.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="clientId">Client ID</Label>
              <Input
                id="clientId"
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="clientSecret">Client Secret</Label>
              <Input
                id="clientSecret"
                type="password"
                value={clientSecret}
                onChange={(e) => setClientSecret(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="scopes">Scopes (comma-separated)</Label>
              <Textarea
                id="scopes"
                value={scopes}
                onChange={(e) => setScopes(e.target.value)}
                placeholder="e.g., https://www.googleapis.com/auth/userinfo.email, https://www.googleapis.com/auth/userinfo.profile"
                className="h-24"
              />
            </div>
            <Button type="submit">Get Tokens</Button>
          </form>
        </CardContent>
      </Card>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="setup">
          <AccordionTrigger>How to Set Up Google OAuth</AccordionTrigger>
          <AccordionContent>
            <ol className="list-decimal list-inside space-y-2">
              <li>
                Go to the Google Cloud Console
                (https://console.cloud.google.com/).
              </li>
              <li>Create a new project or select an existing one.</li>
              <li>
                Navigate to &quot;APIs & Services&quot; &gt;
                &quot;Credentials&quot;.
              </li>
              <li>
                Click &quot;Create Credentials&quot; and select &quot;OAuth
                client ID&quot;.
              </li>
              <li>
                Choose &quot;Web application&quot; as the application type.
              </li>
              <li>
                Set up your authorized JavaScript origins and redirect URIs.
              </li>
              <li>
                Click &quot;Create&quot; to generate your Client ID and Client
                Secret.
              </li>
              <li>
                Copy these credentials and paste them into the form above.
              </li>
              <li>
                Don`&apos;t forget to enable the necessary APIs for your
                project.
              </li>
            </ol>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="security">
          <AccordionTrigger>Security Considerations</AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc list-inside space-y-2">
              <li>Never expose your Client Secret in client-side code.</li>
              <li>Store tokens securely, preferably encrypted.</li>
              <li>Use HTTPS for all OAuth-related traffic.</li>
              <li>Implement proper token refresh mechanisms.</li>
              <li>Validate all tokens on your server before trusting them.</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

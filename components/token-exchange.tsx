"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import Link from "next/link";

export function TokenExchangeComponent() {
  const searchParams = useSearchParams();
  const [tokens, setTokens] = useState<{
    access_token: string | null;
    refresh_token: string | null;
  }>({ access_token: null, refresh_token: null });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const code = searchParams.get("code");
    if (code) {
      exchangeCodeForToken(code);
    } else {
      setError("No authorization code found in URL parameters");
    }
  }, [searchParams]);

  const exchangeCodeForToken = async (code: string) => {
    const clientId = localStorage.getItem("client_id");
    const clientSecret = localStorage.getItem("client_secret");

    if (!clientId || !clientSecret) {
      setError("Client ID and/or Client Secret not found in local storage");
      return;
    }

    const params = new URLSearchParams({
      code: code as string,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: window.location.origin + "/callback",
      grant_type: "authorization_code",
    });
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
      });
      if (!response.ok) {
        throw new Error("Failed to exchange code for token");
      }
      const data = await response.json();
      setTokens({
        access_token: data.access_token,
        refresh_token: data.refresh_token,
      });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setIsLoading(false);
      localStorage.removeItem("client_id");
      localStorage.removeItem("client_secret");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Token Exchange</CardTitle>
          <CardDescription>
            Exchanging authorization code for access token
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              <span>Exchanging code for token...</span>
            </div>
          ) : error ? (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
              <Link href="/">
                <Button className="mt-4">Try Again</Button>
              </Link>
            </Alert>
          ) : tokens.access_token ? (
            <Alert>
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>
                {tokens.refresh_token
                  ? "Access and Refresh tokens"
                  : "Access token"}{" "}
                received.
                <div className="mt-2 whitespace-pre-line">
                  <strong>Access Token:</strong> {tokens.access_token}
                </div>
                <div className="mt-2 whitespace-pre-line">
                  <strong>Refresh Token:</strong>{" "}
                  {tokens.refresh_token ? tokens.refresh_token : "-"}
                </div>
              </AlertDescription>
            </Alert>
          ) : (
            <Alert>
              <AlertTitle>Waiting</AlertTitle>
              <AlertDescription>
                Waiting for authorization code...
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function GoogleOauthSetup() {
  const [clientId, setClientId] = useState('')
  const [clientSecret, setClientSecret] = useState('')
  const [redirectUri, setRedirectUri] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send these credentials to your backend
    console.log('Submitted:', { clientId, clientSecret, redirectUri })
    // In a real app, NEVER log sensitive information like this
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Google OAuth Setup</CardTitle>
          <CardDescription>Enter your Google OAuth credentials</CardDescription>
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
              <Label htmlFor="redirectUri">Redirect URI</Label>
              <Input 
                id="redirectUri" 
                value={redirectUri} 
                onChange={(e) => setRedirectUri(e.target.value)} 
                required 
              />
            </div>
            <Button type="submit">Save Credentials</Button>
          </form>
        </CardContent>
      </Card>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="setup">
          <AccordionTrigger>How to Set Up Google OAuth</AccordionTrigger>
          <AccordionContent>
            <ol className="list-decimal list-inside space-y-2">
              <li>Go to the Google Cloud Console (https://console.cloud.google.com/).</li>
              <li>Create a new project or select an existing one.</li>
              <li>Navigate to "APIs & Services" > "Credentials".</li>
              <li>Click "Create Credentials" and select "OAuth client ID".</li>
              <li>Choose "Web application" as the application type.</li>
              <li>Set up your authorized JavaScript origins and redirect URIs.</li>
              <li>Click "Create" to generate your Client ID and Client Secret.</li>
              <li>Copy these credentials and paste them into the form above.</li>
              <li>Don't forget to enable the necessary APIs for your project.</li>
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
  )
}
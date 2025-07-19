"use client"

import { AppLayout } from "@/components/layout/app-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { User, Bell, Shield, Download, Trash2, Camera, ChevronDown, ChevronRight } from "lucide-react"
import { useState } from "react"

export default function SettingsPage() {
  // Track which sections are open - all open by default
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    profile: true,
    notifications: true,
    security: true,
    data: true,
  })

  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: false,
    priceAlerts: true,
    portfolioUpdates: true,
    marketNews: false,
  })

  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    timezone: "America/New_York",
    currency: "USD",
  })

  const sections = [
    {
      id: "profile",
      title: "Profile Information",
      description: "Update your personal information and profile settings",
      icon: User,
    },
    {
      id: "notifications",
      title: "Notifications",
      description: "Configure how you want to receive notifications",
      icon: Bell,
    },
    {
      id: "security",
      title: "Security",
      description: "Manage your account security and privacy settings",
      icon: Shield,
    },
    {
      id: "data",
      title: "Data & Privacy",
      description: "Export your data or delete your account",
      icon: Download,
    },
  ]

  const toggleSection = (sectionId: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }))
  }

  return (
    <AppLayout>
      <div className="space-y-6 animate-in fade-in-0 duration-500">
        {/* Header */}
        <div className="animate-in slide-in-from-top-4 duration-500">
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences</p>
        </div>

        <div className="space-y-4">
          {sections.map((section, index) => (
            <div
              key={section.id}
              className="animate-in slide-in-from-left-4 duration-500"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Collapsible open={openSections[section.id]} onOpenChange={() => toggleSection(section.id)}>
                <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
                  <CollapsibleTrigger asChild>
                    <CardHeader className="cursor-pointer hover:bg-muted/50 transition-all duration-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900">
                            <section.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <CardTitle className="text-left">{section.title}</CardTitle>
                            <CardDescription className="text-left">{section.description}</CardDescription>
                          </div>
                        </div>
                        <div className="transition-transform duration-200">
                          {openSections[section.id] ? (
                            <ChevronDown className="h-5 w-5 text-muted-foreground" />
                          ) : (
                            <ChevronRight className="h-5 w-5 text-muted-foreground" />
                          )}
                        </div>
                      </div>
                    </CardHeader>
                  </CollapsibleTrigger>

                  <CollapsibleContent className="transition-all duration-300 ease-in-out data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                    <CardContent className="pt-0 pb-6">
                      {section.id === "profile" && (
                        <div className="space-y-6 animate-in slide-in-from-top-2 duration-300">
                          <div className="flex items-center space-x-4">
                            <Avatar className="h-20 w-20 transition-transform hover:scale-105">
                              <AvatarImage src="/placeholder-user.jpg" alt="Profile" />
                              <AvatarFallback className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                                JD
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <Button variant="outline" size="sm" className="transition-all hover:scale-105">
                                <Camera className="mr-2 h-4 w-4" />
                                Change Photo
                              </Button>
                              <p className="text-sm text-muted-foreground mt-2">JPG, GIF or PNG. 1MB max.</p>
                            </div>
                          </div>

                          <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                              <Label htmlFor="firstName">First Name</Label>
                              <Input
                                id="firstName"
                                value={profile.firstName}
                                onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                                className="border-blue-200 focus:border-blue-500 dark:border-blue-700 transition-all"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="lastName">Last Name</Label>
                              <Input
                                id="lastName"
                                value={profile.lastName}
                                onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                                className="border-blue-200 focus:border-blue-500 dark:border-blue-700 transition-all"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="email">Email</Label>
                              <Input
                                id="email"
                                type="email"
                                value={profile.email}
                                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                className="border-blue-200 focus:border-blue-500 dark:border-blue-700 transition-all"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="phone">Phone</Label>
                              <Input
                                id="phone"
                                value={profile.phone}
                                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                                className="border-blue-200 focus:border-blue-500 dark:border-blue-700 transition-all"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="timezone">Timezone</Label>
                              <Select
                                value={profile.timezone}
                                onValueChange={(value) => setProfile({ ...profile, timezone: value })}
                              >
                                <SelectTrigger className="transition-all">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="America/New_York">Eastern Time</SelectItem>
                                  <SelectItem value="America/Chicago">Central Time</SelectItem>
                                  <SelectItem value="America/Denver">Mountain Time</SelectItem>
                                  <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="currency">Currency</Label>
                              <Select
                                value={profile.currency}
                                onValueChange={(value) => setProfile({ ...profile, currency: value })}
                              >
                                <SelectTrigger className="transition-all">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="USD">USD - US Dollar</SelectItem>
                                  <SelectItem value="EUR">EUR - Euro</SelectItem>
                                  <SelectItem value="GBP">GBP - British Pound</SelectItem>
                                  <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white transition-all hover:scale-105">
                            Save Changes
                          </Button>
                        </div>
                      )}

                      {section.id === "notifications" && (
                        <div className="space-y-6 animate-in slide-in-from-top-2 duration-300">
                          <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-all">
                              <div className="space-y-0.5">
                                <Label>Email Notifications</Label>
                                <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                              </div>
                              <Switch
                                checked={notifications.email}
                                onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                              />
                            </div>

                            <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-all">
                              <div className="space-y-0.5">
                                <Label>Push Notifications</Label>
                                <p className="text-sm text-muted-foreground">
                                  Receive push notifications in your browser
                                </p>
                              </div>
                              <Switch
                                checked={notifications.push}
                                onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
                              />
                            </div>

                            <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-all">
                              <div className="space-y-0.5">
                                <Label>SMS Notifications</Label>
                                <p className="text-sm text-muted-foreground">Receive important alerts via SMS</p>
                              </div>
                              <Switch
                                checked={notifications.sms}
                                onCheckedChange={(checked) => setNotifications({ ...notifications, sms: checked })}
                              />
                            </div>

                            <Separator />

                            <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-all">
                              <div className="space-y-0.5">
                                <Label>Price Alerts</Label>
                                <p className="text-sm text-muted-foreground">
                                  Get notified when stocks hit your target prices
                                </p>
                              </div>
                              <Switch
                                checked={notifications.priceAlerts}
                                onCheckedChange={(checked) =>
                                  setNotifications({ ...notifications, priceAlerts: checked })
                                }
                              />
                            </div>

                            <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-all">
                              <div className="space-y-0.5">
                                <Label>Portfolio Updates</Label>
                                <p className="text-sm text-muted-foreground">
                                  Daily summary of your portfolio performance
                                </p>
                              </div>
                              <Switch
                                checked={notifications.portfolioUpdates}
                                onCheckedChange={(checked) =>
                                  setNotifications({ ...notifications, portfolioUpdates: checked })
                                }
                              />
                            </div>

                            <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-all">
                              <div className="space-y-0.5">
                                <Label>Market News</Label>
                                <p className="text-sm text-muted-foreground">Breaking news and market updates</p>
                              </div>
                              <Switch
                                checked={notifications.marketNews}
                                onCheckedChange={(checked) =>
                                  setNotifications({ ...notifications, marketNews: checked })
                                }
                              />
                            </div>
                          </div>

                          <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white transition-all hover:scale-105">
                            Save Notification Settings
                          </Button>
                        </div>
                      )}

                      {section.id === "security" && (
                        <div className="space-y-6 animate-in slide-in-from-top-2 duration-300">
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="currentPassword">Current Password</Label>
                              <Input
                                id="currentPassword"
                                type="password"
                                className="border-blue-200 focus:border-blue-500 dark:border-blue-700 transition-all"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="newPassword">New Password</Label>
                              <Input
                                id="newPassword"
                                type="password"
                                className="border-blue-200 focus:border-blue-500 dark:border-blue-700 transition-all"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="confirmPassword">Confirm New Password</Label>
                              <Input
                                id="confirmPassword"
                                type="password"
                                className="border-blue-200 focus:border-blue-500 dark:border-blue-700 transition-all"
                              />
                            </div>
                          </div>

                          <Separator />

                          <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-all">
                              <div className="space-y-0.5">
                                <Label>Two-Factor Authentication</Label>
                                <p className="text-sm text-muted-foreground">
                                  Add an extra layer of security to your account
                                </p>
                              </div>
                              <Button variant="outline" className="transition-all hover:scale-105">
                                Enable 2FA
                              </Button>
                            </div>

                            <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-all">
                              <div className="space-y-0.5">
                                <Label>Login Sessions</Label>
                                <p className="text-sm text-muted-foreground">Manage your active login sessions</p>
                              </div>
                              <Button variant="outline" className="transition-all hover:scale-105">
                                View Sessions
                              </Button>
                            </div>
                          </div>

                          <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white transition-all hover:scale-105">
                            Update Password
                          </Button>
                        </div>
                      )}

                      {section.id === "data" && (
                        <div className="space-y-6 animate-in slide-in-from-top-2 duration-300">
                          <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-all">
                              <div className="space-y-0.5">
                                <Label>Export Data</Label>
                                <p className="text-sm text-muted-foreground">
                                  Download a copy of your portfolio and transaction data
                                </p>
                              </div>
                              <Button variant="outline" className="transition-all hover:scale-105">
                                <Download className="mr-2 h-4 w-4" />
                                Export
                              </Button>
                            </div>

                            <Separator />

                            <div className="space-y-4">
                              <div className="space-y-0.5">
                                <Label className="text-red-600">Danger Zone</Label>
                                <p className="text-sm text-muted-foreground">
                                  Permanently delete your account and all associated data
                                </p>
                              </div>

                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="destructive" className="transition-all hover:scale-105">
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete Account
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      This action cannot be undone. This will permanently delete your account and remove
                                      all your data from our servers.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction className="bg-red-600 hover:bg-red-700">
                                      Delete Account
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </CollapsibleContent>
                </Card>
              </Collapsible>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  )
}

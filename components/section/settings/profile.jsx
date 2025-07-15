import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function Profile() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>User Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" placeholder="Name" />
            </div>

            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src="/images/avatar/1.jpg?height=64&width=64" alt="Hafsa Humaira" />
                <AvatarFallback>HH</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">Hafsa Humaira</p>
                <p className="text-sm text-muted-foreground">Max file size is 20mb</p>
              </div>
            </div>

            <div>
              <Input id="profilePicture" type="file" className="hidden" />
              <Button variant="outline" size="sm" asChild>
                <label htmlFor="profilePicture" className="cursor-pointer">
                  Choose File
                </label>
              </Button>
              <span className="ml-2 text-sm text-muted-foreground">No file chosen</span>
            </div>

            <Button className="mt-4">Save</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="newEmail">New Email</Label>
              <Input id="newEmail" type="email" placeholder="Email" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input id="newPassword" type="password" defaultValue="**********" />
            </div>

            <p className="text-sm text-blue-600">
              <a href="#" className="hover:underline">
                Enable two factor authentication on the security page
              </a>
            </p>

            <Button className="mt-4">Save</Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="personalFullName">Full Name</Label>
              <Input id="personalFullName" defaultValue="Hafsa Humaira" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="personalEmail">Email</Label>
              <Input id="personalEmail" type="email" defaultValue="Hello@example.com" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" defaultValue="123, Central Square, Brooklyn" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input id="city" defaultValue="New York" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="postCode">Post Code</Label>
              <Input id="postCode" defaultValue="25481" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Select>
                <SelectTrigger id="country">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="ca">Canada</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="au">Australia</SelectItem>
                  <SelectItem value="de">Germany</SelectItem>
                  <SelectItem value="fr">France</SelectItem>
                  <SelectItem value="jp">Japan</SelectItem>
                  <SelectItem value="in">India</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button className="mt-6">Save</Button>
        </CardContent>
      </Card>
    </div>
  )
}


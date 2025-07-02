import { validatePermission } from "@/utils/userPermissions";

export async function GET(req) {
  const userPermissions = req.user.permissions; // Assume user permissions are available in the request
  if (!validatePermission("userRead", userPermissions)) {
    return new Response("Forbidden", { status: 403 });
  }
  // Proceed with fetching user data
}


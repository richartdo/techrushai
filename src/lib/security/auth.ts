export type AuthResult = { data: { user: { id: string } | null }; error?: { message: string } | null };
export async function requireUserId(auth: { getUser: () => Promise<AuthResult> }) { const { data, error } = await auth.getUser(); if (error || !data.user) throw new Error("UNAUTHORIZED"); return data.user.id; }

"user client";
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function userSignOut() {
    const router = useRouter();
    const handleSignout = async function signOut() {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/"); // redirect to login page
                    toast.success("Signout succesfully");
                },
                onError: () => {
                    toast.error(
                        'Failed to sign out'
                    )
                }
            },
        });
    };

    return handleSignout;
}

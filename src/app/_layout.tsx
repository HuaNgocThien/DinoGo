import { useEffect} from "react"
import {onAuthStateChanged} from "firebase/auth"
import { useAuthStore } from "../store/useAuthStore"
import { getUserProfile } from "../services/authService"
import { auth } from "../services/fireBaseConfig"

export default function RootLayout() {
    const user = useAuthStore((s) => s.user)
    const isInitialized = useAuthStore((s) => s.isInitialized)
    const setUser = useAuthStore((s) => s.setUser)
    const setInitialized = useAuthStore((s) => s.setInitialized)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            try {
                if (firebaseUser) {
                    const userProfile = await getUserProfile(firebaseUser.uid)
                } else {
                    setUser(null)
                }
            } catch (error) {
                console.log(error)
                setUser(null)
            } finally {
                setInitialized(true)
            }
        });
        return () => unsubscribe();
    }, []);
}
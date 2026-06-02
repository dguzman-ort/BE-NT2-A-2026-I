import { AuthProvider } from "../hook/useAuth"
import Navigation from "./navigation"

export default function RootLayout() {
    return (
        <AuthProvider>
            <Navigation />
        </AuthProvider>
    )
}

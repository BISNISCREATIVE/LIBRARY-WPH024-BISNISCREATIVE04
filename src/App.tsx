import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Providers } from "./app/providers";
import { CartSheet } from "./components/CartSheet";
import Index from "./pages/Index";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { AdminLoginPage } from "./pages/AdminLoginPage";
import { BooksPage } from "./pages/BooksPage";
import { BookDetailPage } from "./pages/BookDetailPage";
import { ProfilePage } from "./pages/ProfilePage";
import { SuccessPage } from "./pages/SuccessPage";
import { CategoryPage } from "./pages/CategoryPage";
import { AuthorPage } from "./pages/AuthorPage";
import { BookManagementPage } from "./pages/admin/BookManagementPage";
import { UsersManagementPage } from "./pages/admin/UsersManagementPage";
import { AdminPage } from "./pages/AdminPage";
import { MyLoansPage } from "./pages/MyLoansPage";
import { CheckoutPage } from "./components/CheckoutPage";
import NotFound from "./pages/NotFound";

const App = () => (
  <Providers>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/books" element={<BooksPage />} />
          <Route path="/books/:id" element={<BookDetailPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/author/:authorName" element={<AuthorPage />} />
          <Route path="/my-loans" element={<MyLoansPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/books" element={<BookManagementPage />} />
          <Route path="/admin/users" element={<UsersManagementPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <CartSheet />
      </BrowserRouter>
    </TooltipProvider>
  </Providers>
);

export default App;

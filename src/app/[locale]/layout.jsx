import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { Manrope } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SocialNetworks from "@/components/ui/SocalNetworks";
import Providers from "../Providers";

export function generateStaticParams() {
  return [{ locale: "es" }, { locale: "en" }];
}

const manrope = Manrope({
  weights: [400, 500, 600, 700, 800],
  subsets: ["latin-ext"],
});

export const metadata = {
  title: "eCommerce",
  description: "eCommerce",
  keywords: ["Zapatillas", "Calzado", "Moda"],
};

export default async function LocaleLayout({ children, params: { locale } }) {
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className={manrope.className}>
        <Providers>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <Header />
            {children}
            <SocialNetworks />
            <Footer />
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}

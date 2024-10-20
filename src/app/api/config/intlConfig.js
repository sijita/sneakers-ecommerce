import { cookies } from "next/headers";
import { createTranslator } from "next-intl";

export async function configureIntl() {
  const cookieStore = cookies();
  const { value } = cookieStore.get("NEXT_LOCALE");
  const messages = (await import(`../../../messages/${value}.json`)).default;
  return createTranslator({ value, messages });
}

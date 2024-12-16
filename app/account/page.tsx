import AccountForm from '@/components/AccountForm'
import { createClient } from '@/utils/supabase/server'

export default async function Account() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  console.log(user)

  return <AccountForm user={user} />
}
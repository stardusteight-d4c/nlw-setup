import logoImage from '../../../assets/logo.svg'
import { LogoutButton } from '../../LogoutButton'
import { TriggerForm } from './TriggerForm'
import { TriggerFormButton } from './TriggerFormButton'

interface Props {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export const Header = ({ setLoading }: Props) => {
  return (
    <header className={style.wrapper}>
      <img src={logoImage} alt="Habits" />
      <div className={style.contentWrapper}>
        <LogoutButton setLoading={setLoading} />
        <TriggerForm>
          <TriggerFormButton />
        </TriggerForm>
      </div>
    </header>
  )
}

const style = {
  wrapper: `w-full max-w-3xl mx-auto z-0 flex items-center justify-between`,
  contentWrapper: `flex items-center gap-x-5`,
}

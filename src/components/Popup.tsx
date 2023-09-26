import {
  ReactNotifications,
  Store,
  NOTIFICATION_TYPE
} from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import 'animate.css/animate.min.css'

/**
 * Displays a popup in the upper right.
 * @param title Title
 * @param message Message
 * @param type Notification type
 * @param isCountdown Whether to display the countdown. Defaults to true.
 * @param duration Time until it is automatically hidden. 0 is unlimited. Defaults to 5000ms.
 * @returns Popup ID
 */
export function addPopup (
  title: string,
  message: string,
  type: NOTIFICATION_TYPE,
  isCountdown: boolean = true,
  duration: number = 5000
): string {
  return Store.addNotification({
    title,
    message,
    type,
    insert: 'top',
    container: 'top-right',
    animationIn: ['animate__animated', 'animate__flipInX'],
    animationOut: ['animate__animated', 'animate__flipOutX'],
    dismiss: {
      duration,
      pauseOnHover: true,
      onScreen: isCountdown
    }
  })
}

/**
 * Delete the popup being displayed forcibly.
 * @param id ID of the popup
 */
export function deletePopup (id: string): void {
  Store.removeNotification(id)
}

/**
 * A component to display a popup.
 */
export function Popup (): JSX.Element {
  return (
    <div className='app-container'>
      <ReactNotifications />
    </div>
  )
}

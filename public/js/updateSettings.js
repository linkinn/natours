import axios from 'axios'
import { showAlert } from './alert'

export const updateData = async (data, type) => {
  try {
    const url = type === 'password'
      ? 'http://localhost:8000/api/v1/users/updateMyPassword'
      : 'http://localhost:8000/api/v1/users/updateMe'

    const res = await axios({
      method: 'PATCH',
      url,
      data
    })

    if (res.data.status === 'success') {
      showAlert('success', 'Data update successfully!')
      window.setTimeout(() => {
        location.reload(true);
      }, 1000);
    }

  } catch (err) {
    showAlert('error', err.response.data.message)
  }
}
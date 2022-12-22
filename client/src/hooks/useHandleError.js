import { toast } from 'react-toastify'

const useHandleError = () => {
  /**
   * @param {Error} err error object
   * @param {String} what what the function was trying to do when the error occured. (`An unexpected error has occured while trying to ${what}`)
   * @return {Function} function to call as error handling
   */
  const handleError = (err, what) => {
    if (err?.response?.status === 0) return toast.error('No connection to server')
    toast.error(err?.response?.data || `An unexpected error has occured while trying to ${what}`);
  }

  return handleError
};

export default useHandleError;
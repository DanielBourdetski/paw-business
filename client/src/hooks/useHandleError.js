import { toast } from 'react-toastify'

const useHandleError = () => {
  /**
   * @param {Error} err error object
   * @param {String} what what the function was trying to do when the error occured. (`An unexpected error has occured while trying to ${what}`)
   */
  const handleError = (err, what) => {
    toast.error(err?.response?.data || `An unexpected error has occured while trying to ${what}`);
  }

  return handleError
};

export default useHandleError;
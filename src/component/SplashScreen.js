import { useEffect } from "react"

const SplashScreen = ({ nextFacet }) => {

  useEffect(() => {
    setTimeout(() => {
      return nextFacet('isRegister')
    }, 1000)
  }, [])

  return(
    <>
      <h1>
        Hello!, Welcome to the HOT SIT.
        This IS WHO WANTS TO BE A BI-BLON-NIER!!!!
      </h1>
    </>
  )
}

export default SplashScreen;
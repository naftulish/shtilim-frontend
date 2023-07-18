import { useEffect } from "react"

function useTitle( title:string ) {

    useEffect(() => {
        document.title = "שתילים - מערכת ADL | " + title
    },[])

}
export default useTitle
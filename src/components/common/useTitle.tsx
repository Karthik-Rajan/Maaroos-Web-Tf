import { useEffect } from 'react'

function useTitle() {
  const appName = 'Maaroos | ';

  const titleMap = new Map([
    ['/', appName+`Online Food Subscription Portal`],
    ['/listing' , appName+`Vendor Listing`],
    ['/detail' , appName+`Vendor Detail`],
    ['/myaccount', appName+`My Account`]
  ]);

  useEffect(() => {
    document.title  = titleMap.get((window.location.pathname).toString()) || 'Maaroos | Online Food Subscription Portal';
  }, []);
}

export default useTitle
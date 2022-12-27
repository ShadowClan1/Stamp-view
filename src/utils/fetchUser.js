export const fetchUser = () =>  {if(localStorage.getItem('user')!=='undefined'){ return localStorage.getItem('user')} else localStorage.clear()}

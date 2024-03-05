import React, { useEffect } from 'react'
import Home from './Home'
import { Outlet } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { userinfo } from '../user'

const Layout = () => {
  return (
    <>
        <div className='p-[10px] max-w-[960px] my-[0] mx-[auto]'>
            <Home/>
            <Outlet/>
        </div>
    </>
  )
}

export default Layout
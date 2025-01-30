'use client';

import { useUser } from '@clerk/nextjs';
import React from 'react'

function DashboardPage() {
    const { user } = useUser();
  return (
    <div>
        <h1>Dashboard</h1>
        <p>Welcome, {user?.firstName}!</p>
      
    </div>
  )
}

export default DashboardPage

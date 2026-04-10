import React from 'react'
import { useAuth } from '../../context/AuthContext'
import BentoGrid from './BentoGrid'
import SkeletonDashboard from './SkeletonDashboard'

const Dashboard = () => {
  const { profile } = useAuth()

  // Show skeleton while profile is loading from Supabase
  if (!profile) return <SkeletonDashboard />

  return <BentoGrid />
}

export default Dashboard
import React from 'react'
import Slider from '../components/Slider'
import TopDonors from '../components/TopDonors'
import Statistics from '../components/Statistics'
import NoticeForMother from '../components/NoticeForMother'
import GroupNames from '../components/GroupNames'
import { Helmet } from 'react-helmet-async';
import NoticeBoard from '../components/organization/NoticeBoard'
import ThisMonthDonors from '../components/ThisMonthDonors'
export default function Home() {
  return (
    <div>
        <Helmet>
          <title> হোমপেইজ - রক্ত ডট ইনফো </title>
        </Helmet>
        
        <NoticeForMother></NoticeForMother>
        <NoticeBoard></NoticeBoard>
        <GroupNames></GroupNames>
        <TopDonors></TopDonors>
        <ThisMonthDonors></ThisMonthDonors>
        <Statistics></Statistics>
    </div>

  )
}

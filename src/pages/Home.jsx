import React from 'react'
import Slider from '../components/Slider'
import TopDonors from '../components/TopDonors'
import Statistics from '../components/Statistics'
import NoticeForMother from '../components/NoticeForMother'
import GroupNames from '../components/GroupNames'
import { Helmet } from 'react-helmet-async';
export default function Home() {
  return (
    <div>
        <Helmet>
          <title> হোমপেইজ - রক্ত ডট ইনফো </title>
        </Helmet>
        <Slider></Slider>
        <NoticeForMother></NoticeForMother>
        <GroupNames></GroupNames>
        <TopDonors></TopDonors>
        <Statistics></Statistics>
    </div>

  )
}

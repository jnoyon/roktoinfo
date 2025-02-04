import React from 'react'
import Slider from '../components/Slider'
import TopDonors from '../components/TopDonors'
import Statistics from '../components/Statistics'
import NoticeForMother from '../components/NoticeForMother'
import GroupNames from '../components/GroupNames'

export default function Home() {
  return (
    <div>
        <Slider></Slider>
        <NoticeForMother></NoticeForMother>
        <GroupNames></GroupNames>
        <TopDonors></TopDonors>
        <Statistics></Statistics>
    </div>

  )
}

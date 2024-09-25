import React from 'react'
import TopAlumni from "./TopAlumni.jsx"

const LeaderBoard = () => {
    return (
        <div class="mt-24  h-3/5 flex flex-col items-center gap-3 rounded-lg p-4">
            <h1 class="text-2xl font-bold text-gray-700">Top Alumni</h1>
            <div class="m-2 flex flex-col w-80 border-2 rounded-md">
                <div class="h-16  w-full flex items-center justify-around p-3  ">
                    <img src="../medal.png" class="h-[40px] w-[40px] "></img>

                    <div class="flex flex-col">
                        <p class="text-lg font-semibold mr-3">Mohana Swarupa</p>
                        <p class="text-tiny">Credits: 2033</p>
                    </div>
                    <img src="public/girl1.jpg" alt="" class="h-[50px] w-[50px] object-cover rounded-full border-2" />
                </div>
                <hr className="w-full border-t border-gray-200"/>

                <div class="h-16 flex items-center justify-around p-3   text-black">
                    <img src="../medal2.png" class="h-[40px] w-[40px] "></img>
                    <div class="flex flex-col">
                        <p class="text-lg font-semibold">Bhavani Malleswari</p>
                        <p class="text-tiny">Credits: 1933</p>
                    </div>
                    <img src="public/girl.jpeg.jpg" alt="" class="h-[50px] w-[50px] object-cover rounded-full border-2" />


                </div>

                <hr className="w-full border-t border-gray-200"/>
                <div class="h-16 w-full flex items-center p-3 gap-4 ">
                    <img src="../medal3.png" class="h-[40px] w-[40px] ml-2 "></img>
                    <div class="flex flex-col">
                        <p class="text-lg font-semibold">Sadguru Charan</p>
                        <p class="text-tiny">Credits: 1733</p>
                    </div>
                    <img src="public/boy.jpg" alt="" class=" ml-6 h-[50px] w-[50px] object-cover rounded-full border-2 border-gray-200" />

                </div>

            </div>
        </div>
    )
}

export default LeaderBoard
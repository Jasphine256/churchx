'use client'
import { useState } from "react"
import { useEffect } from "react"
import NameValCard from "./NameValCard"
import ListWidget3col from "./ListWidget3col"
import BaseModal from "./BaseModal"
import { PaymentForm } from "@forms/PaymentForm"

const FinanceView = () => {

    const [fetchTrigger, setFetchTrigger] = useState(0)

    const [savedTasks, setTasks] = useState({})

    useEffect(()=>{
        const fetchData = async () =>{
            const response = await fetch('/api/payments')
            const data = await response.json()
            setTasks(data)
            console.log(data)
        }
        fetchData()
    },[fetchTrigger])

    const [formData, setFormData] = useState({
        name:'',
        date:'',
        reason:'',
        amount:'',
    })

    const [transactionType, setTransactionType] = useState('')

    const [isModalVisible, setModalVisible] = useState(false)

    const openModal = (data) =>{
        if (data.type == 'payment'){
            setTransactionType('payment')
            setFormData({
                name:'ABC',
                date:'2018-01-01',
                reason:'abc',
                amount:'UGX 10,000',
            })
            setModalVisible(true)
        }else if (data.type == 'fund'){
            setTransactionType('fund')
            setFormData({
                name:'DEF',
                date:'2018-01-01',
                reason:'def',
                amount:'UGX 10,000',
            })
            setModalVisible(true)
        }else if (data.type == 'new_payment'){
            setModalVisible(true)
        }else if (data.type == 'new_fund'){
            setModalVisible(true)
        }
    }
    const closeModel = () =>{
        setTransactionType('')
        setFormData({
            name:'',
            date:'',
            reason:'',
            amount:'',
        })
        setModalVisible(false)
    }

    const stats = [
        {
            name: 'Account Balance',
            value: 'UGX 25,000,000'
        },
        {
            name: 'Weekly Funds',
            value: 'UGX 650,000'
        },
        {
            name: 'Weekly Expenditure',
            value: 'UGX 550,000'
        }
    ]
    const payments = [
        {
            name: 'Mikhael',
            reason: 'Streaming',
            amount: 'UGX 20,000',
            date: '22-10-2024'
        },
        {
            name: 'Choir',
            reason: 'service',
            amount: 'UGX 200,000',
            date: '14/03/2024'
        },
        {
            name: 'Sera',
            reason: 'Flyer printing',
            amount: 'UGX 100,000',
            date: '26-11-2020'
        },
        {
            name: 'Jubilee',
            reason: 'Data',
            amount: 'UGX 20,000',
            date: '22-10-2023'
        },
        {
            name: 'Mikhael',
            reason: 'other',
            amount: 'UGX 24,0000',
            date: '07-01-2023'
        }
    ]

    const funds = [
        {
            name: 'Congregation',
            reason: 'Offertory',
            amount: 'UGX 260,000',
            date: '22-10-2024'
        },
        {
            name: 'Choir',
            reason: 'T-shirts',
            amount: 'UGX 670,000',
            date: '14/03/2024'
        },
        {
            name: 'Mr. John Doe',
            reason: 'Grant',
            amount: 'UGX 100,000',
            date: '26-11-2020'
        },
        {
            name: 'Mrs. Jane Doe',
            reason: 'School ministry',
            amount: 'UGX 20,000',
            date: '22-10-2023'
        },
        {
            name: 'Mr. Jack Doe',
            reason: 'other',
            amount: 'UGX 98,0000',
            date: '07-01-2023'
        }
    ]
  return (
    <div className="w-4/5 flex flex-col items-center justify-center">
        <section className="w-full m-3 mt-5 flex flex-row flex-wrap items-center justify-evenly">
        {
            stats.map((stat)=>(
                <div className="w-1/4" key={stat.name}>
                    <NameValCard name={stat.name} value={stat.value}/>
                </div>
            ))
        }
        </section>

        <section className="w-[78vw] flex flex-row items-center justify-center">

            <article className="w-1/2 m-2 mx-1 flex flex-col items-center justify-start rounded-lg bg-white">
                <div className="w-full px-4 py-2 flex flex-row flex-nowrap items-center justify-between">
                    <h2 className="font-black text-lg font-bold my-2">Payments</h2>
                    <div>
                        <button className="p-1 px-4 border-2 border-green-400 text-green-600 rounded-md bg-green-100 hover:bg-green-200" onClick={()=>{openModal({type:'new_payment', id: NaN})}}>Add New</button>
                    </div>
                </div>
                <div className="w-full p-4 flex flex-col items-center justify-start h-[62vh] overflow-y-auto overflow-x-hidden">
                    {
                        payments.map((payment)=>(
                            <div className="w-full" key={payment.name} onClick={()=>{openModal({type:'payment', id:payment.name})}}>
                                <ListWidget3col fields={['name', 'reason', 'amount',]} values={[payment.name, payment.reason, payment.amount]}/>
                            </div>
                        ))
                    }
                </div>

            </article>

            <article className="w-1/2 m-2 mx-1 flex flex-col items-center justify-start rounded-lg bg-white">
                <div className="w-full px-4 py-2 flex flex-row flex-nowrap items-center justify-between">
                        <h2 className="font-black text-lg font-bold my-2">Funds</h2>
                        <div>
                            <button className="p-1 px-4 border-2 border-green-400 text-green-600 rounded-md bg-green-100 hover:bg-green-200" onClick={()=>{openModal({type:'new_fund', id: NaN})}}>Add New</button>
                        </div>
                    </div>
                    <div className="w-full p-4 flex flex-col items-center justify-start h-[62vh] overflow-y-auto overflow-x-hidden">
                        {
                            funds.map((fund)=>(
                                <div className="w-full" key={fund.name} onClick={()=>{openModal({type:'fund', id:fund.name})}}>
                                    <ListWidget3col fields={['name', 'reason', 'amount']} values={[fund.name, fund.reason, fund.amount]}/>
                                </div>
                            ))
                        }
                    </div>
            </article>

        </section>
        <BaseModal title={'View/Edit Transaction'} isVisible={isModalVisible} onClose={closeModel}>
            <PaymentForm name={formData.name} reason={formData.reason} amount={formData.amount} date={formData.date} type={transactionType}/>
        </BaseModal>
    </div>
  )
}

export default FinanceView;
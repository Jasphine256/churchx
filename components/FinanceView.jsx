'use client'
import { useState } from "react"
import { useEffect } from "react"
import { useSession } from "next-auth/react"
import NameValCard from "./NameValCard"
import ListWidget3col from "./ListWidget3col"
import BaseModal from "./BaseModal"
import { PaymentForm } from "@forms/PaymentForm"

const FinanceView = () => {

    const {data:session} = useSession()

    const [fetchTrigger, setFetchTrigger] = useState(0)

    const [loading, setLoading] = useState(true)

    const [fetchPayments, setFetchedPayments] = useState([])

    const [fetchFunds, setFetchedFunds] = useState([])

    const [formData, setFormData] = useState({
        name:'',
        date:'',
        reason:'',
        amount:'',
    })

    const [transactionType, setTransactionType] = useState('payments')

    const [isModalVisible, setModalVisible] = useState(false)

    const openModal = async (data) =>{
        if (data.type == 'payment'){
            setTransactionType('payment')
            const response = await fetch(`/api/transactions/payments/${data.id}`)
            const recievedData = await response.json()
            setFormData(recievedData.message)
            setModalVisible(true)
            setFetchTrigger(0)
        }else if (data.type == 'fund'){
            setTransactionType('fund')
            const response = await fetch(`/api/transactions/funds/${data.id}`)
            const recievedData = await response.json()
            setFormData(recievedData.message)
            setModalVisible(true)
            setFetchTrigger(0)
        }else if (data.type == 'new_payment'){
            setTransactionType('payment')
            setModalVisible(true)
            setFetchTrigger(0)
        }else if (data.type == 'new_fund'){
            setTransactionType('fund')
            setModalVisible(true)
            setFetchTrigger(0)
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
        setFetchTrigger((prev)=>{prev++})
    }

    const stats = [
        {
            name: 'Account Balance',
            value: 'UGX _ _ _'
        },
        {
            name: 'Weekly Funds',
            value: 'UGX _ _ _'
        },
        {
            name: 'Weekly Expenditure',
            value: 'UGX _ _ _'
        }
    ]

   

    useEffect(()=>{
        const fetchData = async () =>{
            let queryParams = {user:session?.user.email, transactionType:"payments"}
            let queryString = new URLSearchParams(queryParams).toString()
            let response = await fetch(`/api/transactions?${queryString}`)
            let data = await response.json()

            setFetchedPayments(data.message)
            queryParams = {user:session?.user.email, transactionType:"funds"}
            queryString = new URLSearchParams(queryParams).toString()
            response = await fetch(`/api/transactions?${queryString}`)
            data = await response.json()
            setFetchedFunds(data.message)
        }
        fetchData()
        setLoading(false)
    },[fetchTrigger])

    if (loading){
        return(<></>)
    }

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
                        fetchPayments.map((payment)=>(
                            <div className="w-full" key={payment.name} onClick={()=>{openModal({type:'payment', id:payment.id})}}>
                                <ListWidget3col fields={['name', 'date', 'amount',]} values={[payment.name, payment.date, payment.amount]}/>
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
                            fetchFunds.map((fund)=>(
                                <div className="w-full" key={fund.name} onClick={()=>{openModal({type:'fund', id:fund.id})}}>
                                    <ListWidget3col fields={['name', 'date', 'amount']} values={[fund.name, fund.date, fund.amount]}/>
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
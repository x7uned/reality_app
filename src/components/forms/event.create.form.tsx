import { fetchCreateEvent } from '@/lib/slices/calendar.slice'
import { useAppDispatch } from '@/lib/store'
import { CalendarBlockStyle } from '@/types/calendar'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { MdEventNote } from 'react-icons/md'
import * as yup from 'yup'
import { useData } from '../contexts/data.context'

interface EventCreateFormProps {
	setCreateEventModal: (value: boolean) => void
	refreshData: () => void
}

const EventCreateForm = ({
	refreshData,
	setCreateEventModal,
}: EventCreateFormProps) => {
	const { categories } = useData()
	const dispatch = useAppDispatch()

	const getOptionStyle = (style: CalendarBlockStyle) => {
		switch (style) {
			case 'purple':
				return 'text-[#8560ff]'
			case 'red':
				return 'text-[#913939]'
			case 'ocean':
				return 'text-[#379291]'
			case 'green':
				return 'text-[#5c9137]'
			default:
				return 'text-[#404040]'
		}
	}

	const schema = yup.object().shape({
		content: yup
			.string()
			.min(1, 'Min 1 symbol')
			.max(40, 'Max 40 symbols')
			.required('Content is required'),
		subContent: yup.string().max(80, 'Max 80 symbols').optional(),
		categoryId: yup
			.number()
			.transform(value => (isNaN(value) ? undefined : value))
			.nullable(),
		date: yup.string().required('Date is required'),
	})

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	})

	const onSubmit = async (data: any) => {
		try {
			const fetch = await dispatch(fetchCreateEvent(data))

			if (fetch.payload.success) {
				refreshData()
				setCreateEventModal(false)
			}
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<div className='flex w-full justify-center'>
			<form
				className='flex-col w-full max-w-md'
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className='flex items-center gap-2 mb-6'>
					<MdEventNote size={30} className='text-[var(--second)]' />
					<h2 className='text-xl font-semibold text-[var(--text)]'>
						New Event
					</h2>
				</div>

				<div className='relative mb-2'>
					<label
						htmlFor='content'
						className='block text-[var(--text)] dark:text-gray-300'
					>
						Content:
					</label>
					<input
						id='content'
						{...register('content')}
						className='w-full p-2 border rounded border-[var(--border)] bg-[var(--bg)] text-[var(--text)] focus:outline-none focus:border-[var(--second)]'
					/>
					{errors.content && (
						<span className='text-red-400 text-sm font-bold'>
							{errors.content.message}
						</span>
					)}
				</div>

				<div className='relative mb-2'>
					<label
						htmlFor='subContent'
						className='block text-[var(--text)] dark:text-gray-300'
					>
						Sub Content:
					</label>
					<input
						id='subContent'
						{...register('subContent')}
						className='w-full p-2 border rounded border-[var(--border)] bg-[var(--bg)] text-[var(--text)] focus:outline-none focus:border-[var(--second)]'
					/>
					{errors.subContent && (
						<span className='text-red-400 text-sm font-bold'>
							{errors.subContent.message}
						</span>
					)}
				</div>

				<div className='relative mb-2'>
					<label
						htmlFor='categoryId'
						className='block text-[var(--text)] dark:text-gray-300'
					>
						Category:
					</label>
					<select
						id='categoryId'
						{...register('categoryId')}
						className='w-full p-2 border rounded border-[var(--border)] bg-[var(--bg)] text-[var(--text)] focus:outline-none focus:border-[var(--second)]'
					>
						<option value=''>Without category</option>
						{categories.map(category => (
							<option
								className={`${getOptionStyle(category.style)}`}
								key={category.id}
								value={category.id}
							>
								{category.name}
							</option>
						))}
					</select>
					{errors.categoryId && (
						<span className='text-red-400 text-sm font-bold'>
							{errors.categoryId.message}
						</span>
					)}
				</div>

				<div className='relative mb-2'>
					<label
						htmlFor='date'
						className='block text-[var(--text)] dark:text-gray-300'
					>
						Date:
					</label>
					<input
						id='date'
						type='date'
						{...register('date')}
						className='w-full p-2 border rounded border-[var(--border)] bg-[var(--bg)] text-[var(--text)] focus:outline-none focus:border-[var(--second)]'
					/>
					{errors.date && (
						<span className='text-red-400 text-sm font-bold'>
							{errors.date.message}
						</span>
					)}
				</div>

				<button
					type='submit'
					className='bg-[var(--second)] w-full py-2 rounded-md mt-2 text-white'
				>
					Create Event
				</button>
			</form>
		</div>
	)
}

export default EventCreateForm

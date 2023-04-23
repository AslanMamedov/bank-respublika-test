import { Box, Button } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch } from 'react-redux';
import InfoUserFormFields from './InfoUserFormFields';
import { setUser } from '../redux/slices/UserSlice';
import { useNavigate } from 'react-router-dom';
import { UserSchema, schema } from '../types';

type SignUpSchema = UserSchema & {};

const SignUp = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const methods = useForm<SignUpSchema>({
		mode: 'onChange',
		resolver: zodResolver(schema),
	});

	const onSubmit = (data: SignUpSchema) => {
		dispatch(setUser(data));
		navigate(`/:${data.fin}`);
		methods.reset();
	};
	return (
		<Box
			sx={{
				gap: '20px',
				width: '100%',
				height: '100%',
				display: 'grid',
				maxWidth: '800px',
				borderRadius: '4px',
				padding: '10px 10px',
				border: '1px solid rgba(0, 0, 0, .2)',
			}}
			component={'section'}
		>
			<FormProvider {...methods}>
				<Box
					sx={{
						gap: '20px',
						width: '100%',
						height: '100%',
						display: 'grid',
						borderRadius: '4px',
						padding: '10px 10px',
					}}
					component={'form'}
					onSubmit={methods.handleSubmit(onSubmit)}
				>
					<InfoUserFormFields />
					<Button
						disabled={!methods.formState.isValid}
						variant="outlined"
						sx={{ height: '50px', fontSize: '18px' }}
						type="submit"
					>
						Регистрация
					</Button>
					<Button
						variant="outlined"
						sx={{ height: '50px', fontSize: '18px' }}
						onClick={() => navigate('/')}
						type="submit"
					>
						Войти
					</Button>
				</Box>
			</FormProvider>
		</Box>
	);
};

export default SignUp;

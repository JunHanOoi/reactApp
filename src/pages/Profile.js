import React from 'react'
import { useForm } from 'react-hook-form'
import Typography from '@mui/material/Typography';


export default function Profile() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => alert("User ID is "+data.username+ " Password is "+data.password)

    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    };

    const inputStyle = {
        width: '100%',
        marginBottom: '10px',
        padding: '8px',
    };

    return (
        <div style={{ height: '200vh', width: '30%' }}>
            <Typography variant="h3" style={{ margin: '20px 0px 20px 145px'}}>
                Login
            </Typography>
            <form style={formStyle} onSubmit={handleSubmit(onSubmit)}>
                <input {...register('username', { required: true })} style={inputStyle} placeholder="Username" />
                {errors.username && <span style={{ color: 'red' }}>*This field is required</span>}
                <input
                    {...register('password', { required: true })}
                    style={inputStyle}
                    placeholder="Password"
                    type="password"
                />
                {errors.password && <span style={{ color: 'red' }}>*This field is required</span>}
                <input type="submit" style={{ width: '80%', padding: '8px' }} />
            </form>
        </div>
    )
}
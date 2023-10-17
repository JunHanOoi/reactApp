import React from 'react'
import { useForm } from 'react-hook-form'
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';


export default function Profile() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    
    const onSubmit = handleSubmit(data => {
        alert("User ID is " + data.username + " Password is " + data.password)
    })

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
            <Typography variant="h3" style={{ margin: '20px 0px 20px 145px' }}>
                Login
            </Typography>
            <form style={formStyle} onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    id="outlined-basic"
                    variant="outlined"
                    {...register('username', { required: true })}
                    style={inputStyle}
                    label="Username"
                    error={errors.username}
                    helperText={errors.username ? '*This field is required' : null}
                />
                <TextField
                    id="outlined-basic"
                    variant="outlined"
                    {...register('password', { required: true })}
                    style={inputStyle}
                    label="Password"
                    error={errors.password}
                    helperText={errors.password ? '*This field is required' : null}
                />
                <input type="submit" style={{ width: '80%', padding: '8px' }} />
            </form>
        </div>
    )
}
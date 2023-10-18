import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/base/Button';
import classes from './Profile.module.css'


export default function Profile() {
    const {
        handleSubmit,
        control,
    } = useForm()

    const onSubmit = handleSubmit(data => {
        alert("User ID is " + data.username + " Password is " + data.password)
    })

    return (
        <div className={classes.divStyle}>
            <Typography variant="h3" className={classes.headerStyle}>
                Login
            </Typography>
            <form className={classes.formStyle} onSubmit={onSubmit}>
                <Controller
                    name="username"
                    control={control}
                    defaultValue=""
                    rules={{ required: true }}
                    render={({ field, fieldState }) => (
                        <TextField
                            id="outlined-basic"
                            variant="outlined"
                            {...field}
                            className={classes.inputStyle}
                            label="Username"
                            error={!!fieldState.error}
                            helperText={fieldState.error ? '*This field is required' : null}
                        />
                    )}
                />
                <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    rules={{ required: true }}
                    render={({ field, fieldState }) => (
                        <TextField
                            id="outlined-basic"
                            variant="outlined"
                            type='password'
                            {...field}
                            className={classes.inputStyle}
                            label="Password"
                            error={!!fieldState.error}
                            helperText={fieldState.error ? '*This field is required' : null}
                        />
                    )}
                />
                <Button type="submit" className={classes.buttonStyle}>
                    Submit
                </Button>
            </form>
        </div>
    )
}
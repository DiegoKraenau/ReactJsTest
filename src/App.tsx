import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField } from "@material-ui/core";

function App() {
  //Classes and states
  interface IFormInputs {
    email: string;
    password: string;
    email_test: string;
  }

  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup
      .string()
      .min(4, "Necesitas minimo 4 letras")
      .max(20)
      .required(),
    email_test: yup
      .string()
      .email()
      .required("Ne ecesita un email")
      .min(4, "Email 4 letras min")
      .max(20, "Email 20 letras max"),
  });

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

  const formSubmitHandle: SubmitHandler<IFormInputs> = (data: IFormInputs) => {
    console.log(data);
  };

  return (
    <div className="center">
      <h2>React Hook From</h2>
      <main>
        <form onSubmit={handleSubmit(formSubmitHandle)}>
          <input
            defaultValue="diegokraenau@gmail.com"
            {...register("email")}
          ></input>
          <br></br>
          <br></br>
          <input {...register("password")}></input>
          <br></br>
          {errors.password && errors.password?.message && (
            <span>{errors.password.message}</span>
          )}
          <br></br>
          <br></br>
          <Controller
            name="email"
            control={control}
            defaultValue="diegokraenau@gmail.com"
            render={({ field }) => (
              <TextField
                {...field}
                label="email"
                variant="outlined"
                error={!!errors.email_test}
                helperText={errors.email_test ? errors.email_test.message : ""}
              ></TextField>
            )}
          />
          <br></br>
          <br></br>
          <input type="submit"></input>
        </form>
      </main>
    </div>
  );
}

export default App;

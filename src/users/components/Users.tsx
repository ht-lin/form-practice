import { useEffect, Fragment } from "react";
import {
  SubmitHandler,
  useFormContext,
  useWatch,
  FieldErrors,
  useFieldArray,
} from "react-hook-form";
import { RHFAutocomplete } from "../../components/RHFAutocomplete";
import { RHFTextField } from "../../components/RHFTextField";
import { RHFSwitch } from "../../components/RHFSwitch";
import { RHFDateRangePicker } from "../../components/RHFDateRangePicker";
import { RHFCheckbox } from "../../components/RHFCheckbox";
import {
  Container,
  Stack,
  Button,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListSubheader,
  ListItemText,
} from "@mui/material";
import { Schema, defaultValues } from "../types/schema";
import {
  getTitles,
  getSkills,
  getUsers,
  getUser,
  createUser,
  editUser,
} from "../utils/storage";
import { db } from "../../db";
import { Option } from "../../types/option";

export function Users() {
  const titles = getTitles();
  const skills = getSkills();
  const users = getUsers();

  const {
    watch,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    reset,
  } = useFormContext<Schema>();

  const fullErrors: FieldErrors<Extract<Schema, { workExperience: true }>> =
    errors;

  const { fields, replace, remove, append } = useFieldArray<Schema>({
    control,
    name: "companyAndTimeRange",
  });

  const workExperience = useWatch<Schema>({ control, name: "workExperience" });
  const id = useWatch<Schema>({ control, name: "id" });
  const variant = useWatch<Schema>({ control, name: "variant" });

  const handleUserClick = (id: string) => {
    setValue("id", id);
  };

  useEffect(() => {
    if (getUser(id as string)) {
      reset(getUser(id as string));
    }
  }, [id]);

  const handleReset = () => {
    reset(defaultValues);
  };

  const onSubmit: SubmitHandler<Schema> = (data) => {
    if (variant === "create") {
      createUser(data);
    } else {
      editUser(data);
    }
  };

  return (
    <Container maxWidth="sm" component="form" onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h4" component="h1" align="center">
        Form Practice
      </Typography>
      <Stack sx={{ flexDirection: "row", gap: 2 }}>
        <List subheader={<ListSubheader>Users</ListSubheader>}>
          {users?.map((user) => (
            <ListItem disablePadding key={user.id}>
              <ListItemButton
                onClick={() => handleUserClick(user.id)}
                selected={id === user.id}
              >
                <ListItemText primary={user.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Stack sx={{ gap: 2 }}>
          <RHFAutocomplete<Schema>
            name="title"
            options={titles}
            label="Title"
          />
          <RHFTextField<Schema>
            name="name"
            label="Name"
            error={!!fullErrors.name}
            helperText={fullErrors.name?.message}
          />
          <RHFTextField<Schema>
            name="email"
            label="Email"
            error={!!fullErrors.email}
            helperText={fullErrors.email?.message}
          />
          <RHFSwitch<Schema>
            name="workExperience"
            label="Have you work experience?"
          />
          {workExperience &&
            fields.map((field, index) => (
              <Fragment key={field.id}>
                <RHFTextField<Schema>
                  name={`companyAndTimeRange.${index}.company`}
                  label="Company"
                  error={!!fullErrors.companyAndTimeRange?.[index]?.company}
                  helperText={
                    fullErrors.companyAndTimeRange?.[index]?.company?.message
                  }
                />
                <RHFDateRangePicker<Schema>
                  name={`companyAndTimeRange.${index}.timeRange`}
                />
                <Button
                  onClick={() => remove(index)}
                  type="button"
                  color="error"
                >
                  Remove
                </Button>
              </Fragment>
            ))}
          {workExperience && (
            <Button onClick={() => append({ company: "", timeRange: [] })}>
              Add new company
            </Button>
          )}
          <RHFCheckbox<Schema> name="skills" options={skills} label="Skills" />

          <Stack sx={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Button variant="contained" type="submit">
              {variant === "create" ? "New user" : "Edit user"}
            </Button>
            <Button onClick={handleReset}>Reset</Button>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
}

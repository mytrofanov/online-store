import React from "react";
import { useForm } from "react-hook-form";

export default function InfoForm({info, onSubmit}) {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

     return (
        /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
        <form onSubmit={handleSubmit(onSubmit)}>
            {info.map(i=>
            <div>
                <input key={i.id + i.title} defaultValue={i.title}
                       {...register(`${i.id}`)}/>
                <input key={i.id + i.description} defaultValue={i.description}
                       {...register(`d:${i.id}`)}/>
            </div>

            )}

            <input type="submit" />
        </form>
    );
}
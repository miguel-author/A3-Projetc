import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsUUID, MinLength, IsString, MaxLength, IsEnum, IsOptional, IsDateString } from "class-validator";

export enum TaskStatusEnum{
    TO_DO = 'TO_DO',
    DONE = 'DONE'
}
export class TaskDTO{

    @ApiProperty({description: "Id da task criada"})
    @IsUUID()
    @IsOptional()
    id: number;
    
    @ApiProperty({
        description: "Titulo da task criada",
        example: "Limpar a casa",
    })
    @IsString()
    @MinLength(3)
    @MaxLength(256)
    title: string;


    @ApiProperty({
        description: "Descrição da task",
        example:"Limpar toda a casa e não esquecer de estender a roupa",
    })
    @IsString()
    @MinLength(3)
    @MaxLength(256)
    description: string;


    @ApiProperty({
        description: "Status da Task(TO_DO, IN_PROGRESS, DONE)",
        example: "IN_PROGRESS",
    })
    @IsEnum(TaskStatusEnum)
    @IsOptional()
    status: string;


    @ApiProperty({
        description: "Data de expiração da task",
        example: "30/05/2024"
    })
    @IsDateString()
    @IsOptional()
    expirationDate: string;
}


export class UpdateTaskDTO extends PartialType(TaskDTO){}
export interface FindAllParameters{
    title: string;
    status: string;
}
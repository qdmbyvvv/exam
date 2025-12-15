import { PartialType } from '@nestjs/swagger';
import { CreateStatistikaDto } from './create-statistika.dto';

export class UpdateStatistikaDto extends PartialType(CreateStatistikaDto) {}

import {DefaultCrudRepository} from '@loopback/repository';
import {Job, JobRelations} from '../models';
import {PalnegocioDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class JobRepository extends DefaultCrudRepository<
  Job,
  typeof Job.prototype.id,
  JobRelations
> {
  constructor(
    @inject('datasources.palnegocio') dataSource: PalnegocioDataSource,
  ) {
    super(Job, dataSource);
  }
}

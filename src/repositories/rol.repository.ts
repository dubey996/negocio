import {DefaultCrudRepository} from '@loopback/repository';
import {Rol, RolRelations} from '../models';
import {PalnegocioDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class RolRepository extends DefaultCrudRepository<
  Rol,
  typeof Rol.prototype.idrol,
  RolRelations
> {
  constructor(
    @inject('datasources.palnegocio') dataSource: PalnegocioDataSource,
  ) {
    super(Rol, dataSource);
  }
}

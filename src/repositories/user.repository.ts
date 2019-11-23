import { DefaultCrudRepository, BelongsToAccessor, repository } from '@loopback/repository';
import { User, UserRelations, Rol } from '../models';
import { PalnegocioDataSource } from '../datasources';
import { inject, Getter } from '@loopback/core';
import { RolRepository } from '../repositories';




export type Credentials = {
  email: string;
  password: string;
}

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
  > {

  public readonly rol: BelongsToAccessor<
    Rol,
    typeof User.prototype.id
  >;
  constructor(
    @inject('datasources.palnegocio') dataSource: PalnegocioDataSource,
    @repository.getter('RolRepository')
    rolRepositoryGetter: Getter<RolRepository>,
  ) {
    super(User, dataSource);
    this.rol = this.createBelongsToAccessorFor(
      'rol',
      rolRepositoryGetter,
    );
  }
}
